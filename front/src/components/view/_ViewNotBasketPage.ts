import { createElement } from '../utils/utils';

class ViewNotBasket {
  create() {
    const notFound = `
    <div class="page-main-NotFound _main-container">
      <section class="main-NotFound _container NotFound">
        <h3 class="NotFound__title">Basket is Empty</h3>
      </section>
    </div>`
  return createElement(notFound)
  }
}

export default ViewNotBasket