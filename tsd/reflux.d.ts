declare namespace __reflux {
    module reflux {
        function createActions(ary: string[]): any;
        function createStore(props: any): any;
    }    

    interface IStore {
        listen: Function;
    }
}

declare module "reflux" {
    import reflux = __reflux.reflux;
    export = reflux;
}