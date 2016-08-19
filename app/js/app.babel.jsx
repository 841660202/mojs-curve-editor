// import './tags/curve-editor.tag';
require('../css/main');
import { Provider } from 'preact-redux';
import {render, h}  from 'preact';
import CurveEditor  from './tags/curve-editor';
import initStore    from './store';
import C            from './constants';
import hash         from './helpers/hash';
import fallbackTo   from './helpers/fallback-to';
import defer        from './helpers/defer';

// TODO
//   - handle translate isRecord
//   - multiple editors short cuts
//   - resize down when points are above the editor border
//   - instance dropdown on code panel
//   - import path data
//   - move bunch of points at once

class API {
  constructor ( o = {} ) {
    this._o = o;

    this._decalareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
    this._tryToRestore();
    this._listenUnload();

    this._subscribe();
  }

  _decalareDefaults ( ) {
    this._defaults = {
      name:           'mojs-curve-editor',
      isSaveState:    true
    }
  }


  _extendDefaults () {
    this._props = {};

    for (let key in this._defaults) {
      this._props[ key ] = fallbackTo( this._o[key], this._defaults[key] );
    }
  }

  _vars () {
    this.revision = '1.0.0';
    this.store    = initStore();

    this._easings = [];
    this._progressLines = [];

    let str = fallbackTo( this._o.name, this._defaults.name );
    str += ( str === this._defaults.name ) ? '' : `__${this._defaults.name}`;
    this._localStorage = `${str}__${ hash( str ) }`;
  }

  _render () {
    document.addEventListener('DOMContentLoaded', () => {
      render(
        <Provider store={this.store}>
          <CurveEditor progressLines={this._progressLines} />
        </Provider>, document.body);
    });
  }

  _listenUnload () {
    const unloadEvent = ('onpagehide' in window) ? 'pagehide' : 'beforeunload';
    window.addEventListener( unloadEvent, () => {
      if ( this._props.isSaveState ) {
        const preState = { ...this.store.getState() };

        delete preState.points.history;
        delete preState.pointControls.history;
        preState.progressLines.lines = [];

        localStorage.setItem(this._localStorage, JSON.stringify( preState ) );
      } else {
        localStorage.removeItem( this._localStorage );
      }
    });
  }

  _tryToRestore () {
    const stored = localStorage.getItem(this._localStorage);
    if ( stored ) { this.store.dispatch({ type: 'SET_STATE', data: JSON.parse(stored) });}
    else {
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 0,   y: C.CURVE_SIZE, isLockedX: true}, index: 0 } });
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 100, y: 0, isLockedX: true}, index: 1 } });
      // this.store.dispatch({ type: 'POINT_SELECT', data: { index: 0, type: 'straight' } });
    }
  }

  _subscribe () {
    this._compilePath();
    this.store.subscribe( this._compilePath.bind(this) );
  }

  _compilePath () {
    const state     = this.store.getState(),
          points    = state.points.present,
          {path}    = points;

    if ( this._prevPath !== path ) {
      this._prevPath = path;
      this._easing = mojs.easing.path( path );
      this._fireOnChange( path );
    }
  }

  _fireOnChange ( path ) {
    for (var i = 0; i < this._easings.length; i++) {
      const record     = this._easings[i],
            {options, easing}  = record,
            {onChange} = options;
      
      (typeof onChange === 'function' ) && onChange( easing, path );
      this._updateParent( easing );
    }
  }

  _updateParent( easing ) {
    const parent = easing._parent;

    if ( parent && parent.setProgress ) {
      this._triggerParent( parent );
    } else if ( parent.timeline ) {
      this._triggerParent( parent.timeline )
    } else if ( parent.tween ) {
      this._triggerParent( parent.tween )
    }
  }

  _triggerParent (parent) {
    const step = 0.001,
          {progress} = parent,
          updateProgress = (progress + step < 1 )
            ? (progress + step) : (progress - step);

    parent.setProgress( updateProgress );
    parent.setProgress( progress );
  }

  getEasing (o={}) {
    // get the easing function regarding reverse options
    const fun = (() => {
      const i = this._easings.length;
      return (k) => {
        this._updateProgressLine( k, i, this._progressLines );
        const transform = this._easings[i].options.transform;
        return ( transform )
          ? transform( this._easing( k ) ) : this._easing( k );
      }
    })();

    this.store.dispatch({ type: 'ADD_PROGRESS_LINE', data: {} });
    this._easings.push({ options: o, easing: fun });

    defer( () => { this._fireOnChange( this._prevPath ); });
    return fun;
  }

  _updateProgressLine (p, i, lines) {
    const el = lines[i],
          state = this.store.getState(),
          {resize} = state;

    if ( !el ) { return; }

    el.style.left = `${p*100}%`;

    // const x = p * ( C.CURVE_SIZE + resize.temp_right + resize.right ),
    //       transform = `translateX(${x}px)`;

    // mojs.h.setPrefixedStyle( el, 'transform', transform );
  }

}

export default API;
window.MojsCurveEditor = API;

// curve
//   .getFunction({ isInverseX: false, isInverseY: true, name: 'Some name' })
//   .getCode()


