import Controller from './Controller';
import RouterSingleton from '../libs/RouterSingleton';
import PageController from './PageController';

export default class ApplicationController extends Controller {

  constructor() {
    super();

    // TODO: Find more elegant solution to this and handling anchors in the
    // web app for dynamically loaded content
    // var sideNav = document.getElementsByTagName('app-sidenav')[0];

    document.addEventListener('side-nav-ready', (navReadyEvent) => {
      var router = RouterSingleton.getRouter();
      var sideNav = document.getElementsByTagName('app-sidenav')[0];
      // var anchorElements = sideNav.querySelectorAll('a');
      var anchorElements = document.querySelectorAll('a');
      for (var i = 0; i < anchorElements.length; i++) {
        if (!anchorElements[i].href) {
          continue;
        }

        anchorElements[i].addEventListener('click', (clickEvent) => {
          console.log('Clicked link controlled by router');
          console.log(clickEvent);
          clickEvent.stopPropagation();
          clickEvent.preventDefault();

          sideNav.opened = false;

          router.goToPath(clickEvent.currentTarget.href);
        });
      }

      router.setDefaultRoute(new PageController());
      router.requestStateUpdate();
    });
  }
}
