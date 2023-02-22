import { Component } from "../component";
import { Watcher } from "../../reactivity/watcher";
import { VNode } from "../vnode";

export function mountComponent(vm: Component, el: Element): Component {
  vm.$el = el;
  const updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, () => {});

  return vm;
}

export function lifecycleMixin(Vue: typeof Component) {
  Vue.prototype._update = function (vnode: VNode) {
    const vm: Component = this;
    const prevVnode = vm._vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
  };
}