import { ActionTree, GetterTree, Module as Mod, MutationTree } from "vuex"
import { DynamicModuleOptions } from "../moduleoptions"

export function staticStateGenerator<S extends Record<string, any>> (
  module: Function & Mod<S, any>,
  modOpt: DynamicModuleOptions,
  statics: any
) {
  const state: S = modOpt.stateFactory ? (module as any).state() : module.state
  Object.keys(state).forEach((key) => {
    if (state.hasOwnProperty(key)) {
      // If not undefined or function means it is a state value
      if (!["undefined", "function"].includes(typeof (state as any)[key])) {
        Object.defineProperty(statics, key, {
          get () {
            return statics.store.state[modOpt.name][key]
          },
          set (val) {
            statics.store.state[modOpt.name][key] = val
          }
        })
      }
    }
  })
}

export function staticGetterGenerator<S> (
  module: Function & Mod<S, any>,
  modOpt: DynamicModuleOptions,
  statics: any
) {
  Object.keys(module.getters).forEach((key) => {
    if (module.namespaced) {
      Object.defineProperty(statics, key, {
        get () {
          return statics.store.getters[`${modOpt.name}/${key}`]
        }
      })
    } else {
      Object.defineProperty(statics, key, {
        get () {
          return statics.store.getters[key]
        }
      })
    }
  })
}

export function staticMutationGenerator<S> (
  module: Function & Mod<S, any>,
  modOpt: DynamicModuleOptions,
  statics: any
) {
  Object.keys(module.mutations).forEach((key) => {
    if (module.namespaced) {
      statics[key] = function (...args: any[]) {
        statics.store.commit(`${modOpt.name}/${key}`, ...args)
      }
    } else {
      statics[key] = function (...args: any[]) {
        statics.store.commit(key, ...args)
      }
    }
  })
}

export function staticActionGenerators<S> (
  module: Function & Mod<S, any>,
  modOpt: DynamicModuleOptions,
  statics: any
) {
  Object.keys(module.actions).forEach((key) => {
    if (module.namespaced) {
      statics[key] = async function (...args: any[]) {
        return statics.store.dispatch(`${modOpt.name}/${key}`, ...args)
      }
    } else {
      statics[key] = async function (...args: any[]) {
        return statics.store.dispatch(key, ...args)
      }
    }
  })
}
