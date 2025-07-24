import app from "@/main";

class Button {
  constructor(data) {
    this.type  = data.type;
    this.img   = data.img  || null;
    this.name  = data.name;
    data.onClick  ? this.onClick  = data.onClick  : null;
    data.onChange ? this.onChange = data.onChange : null;
  }
  onClick() {}
  onChange() {}
}

class Input {
  static ref = 0;
  constructor(data) {
    Input.ref ++;
    this.typeI = data.typeI || 'text'
    this.ref   = data.ref   || ('_' + Input.ref)
    this.img   = data.img   || null;
    this.type  = data.type;
    this.placeholder = data.placeholder;
    data.onClick  ? this.onClick  = data.onClick  : null;
    data.onChange ? this.onChange = data.onChange : null;
    data.keyDown ? this.keyDown = data.keyDown : null;
    data.keyUp ? this.keyUp = data.keyUp : null;
    this.value = '';
  }
  onClick() {}
  onChange() {}
  keyUp() {}
  keyDown() {}
}

class Lable {
  constructor(data) {
    this.text = data.text || '___';
    this.img  = data.img  || null;
    this.type = data.type;
    this.size = data.size ? data.size : 20;
    data.onClick ? this.onClick = data.onClick : null;
  }
  onClick() {}
}

class Route {
  constructor(data) {
    this.name = data.name || '___';
    this.img  = data.img  || null;
    this.path = data.path || null;
    this.type = data.type;
    data.onClick ? this.onClick = data.onClick : null;
  }
  onClick() {
    if (! this.path || app.$route.path === this.path) return;
    app.$router.push(this.path)
  }
}

class Hr {
  constructor(data) {
    this.type = data.type;
    this.width = data.width || 80;
  }
}

const classs = {
  Button, Input, Text, Lable, Route, Hr
}

export default {
  namespaced: true,
  state: {
    items: [],
    values: {},
    isShow: false,
    hide: true,
    width: 34
  },
  getters: {
    hide: (state)=> state.hide,
    state: (state)=> state.isShow,
    width :(state)=> state.isShow ? state.width : 6,
    items: (state)=> state.items,
    classes: ()=> classs,
  },
  mutations: {
    create(state, Schema = [], State = 'default', hide) {
      if (hide) return state.hide = true;
      state.items = []
      Schema.forEach(element => {
        if (! classs[element.type]) return;
        const item = new classs[element.type](element)
        state.items.push(item)
      });
      if (Schema.length) state.hide = false;
      if (State === 'default') return;
      state.isShow = true;
    },
    getRefValue(state, key) {
      return state.values[key]
    },
    setRefValue(state, [key, value]) {
      state.values[key] = value;
    },
    setState(state, boll) {
      state.isShow = boll;
    },
    setHide(state, boll) {
      state.hide = boll
    }
  },
}