class Router {
  routes: {
    [key: string]: {
      name: string;
      routesPage: (x: string) => void;
    }
  };

  constructor() {

    this.routes = {
      '/page404': {
        name: 'Page not found',
        routesPage: this.routesFuntion
      },
      '/product': {
        name: 'Product details',
        routesPage: this.routesFuntion
      },
      '/basket': {
        name: 'Product details',
        routesPage: this.routesFuntion
      },
      '/': {
        name: 'Home',
        routesPage: this.routesFuntion
      },
    };


    // this.startRouteListenner();
    // this.handleLocation();

  }

  routesFuntion(name: string) {
    document.title = `Store - ${name}`;
    // this.count = this.count + 1
    // console.log("this.count", this.count)

    if (name !== 'Home') {
            // window.history.pushState({}, '', '/')
      // const path = window.location.pathname;
      // window.history.pushState({}, '', path)
      // window.location.reload()
      // console.log("path 555===", path)
      const div = document.createElement('div');
      div.textContent = name;
      document.body.replaceChildren(div);
      // console.log('111111111111111111')
    } 
    else {

      // const div = document.createElement('div');
      // div.textContent = name;
      // document.body.replaceChildren(div);
      // window.history.pushState({}, '', '/')
      // window.location.reload()
    }
 
  }
  startRouteListenner() {
    window.onpopstate = this.handleLocation;
    console.log('Start startRouteListenner')
  }

  pushState(path:string) {

    // window.location.assign(`${window.location.origin}${path}`)

    // window.history.pushState({}, '', path)
    // window.location.reload()
  }


  handleLocation(e:Event) {
    console.log('this.routes========',this.routes)
    console.log('eeeeeeeeeee',e)
    e.preventDefault()
    // const href = window.location.href
    // console.log("href ===", href)
    const path = window.location.pathname;
    console.log("path 111===", path)
    const route = this.routes[path] || this.routes['/page404'];
        // console.log("route", route)
    route.routesPage(route.name);
    // document.title = `Store - ${route.name}`;
    // preventDefault()
    // window.history.pushState({}, '', path)
  }

}

export default Router