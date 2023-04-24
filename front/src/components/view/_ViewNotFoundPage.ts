import { createElement } from '../utils/utils';

class ViewNotFound {
  create() {
    const notFound = `
    <div class="page-main-NotFound _main-container">
      <section class="main-NotFound _container NotFound">
        <h3 class="NotFound__title">404 Not Found</h3>
      </section>
    </div>`
  return createElement(notFound)
  }
}

export default ViewNotFound