import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    productsFailure: false,
    searchInput: '',
    category: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  onClear = () => {
    this.setState({rating: '', category: '', searchInput: ''})
  }

  onRating = ratingId => {
    this.setState({rating: ratingId})
  }

  onCategory = categoryId => {
    this.setState({category: categoryId})
  }

  onChange = value => {
    this.setState({searchInput: value})
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, searchInput, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category${category}&title_search${searchInput}&rating${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({productsFailure: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {
      productsList,
      searchInput,
      productsFailure,
      activeOptionId,
      rating,
    } = this.state

    if (productsList.length === 0) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png "
          alt="no products"
        />
      )
    }
    return (
      <div className="all-products-container">
        {productsFailure ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png "
            alt="products failure"
          />
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard
                ratingId={rating}
                productData={product}
                key={product.id}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, searchInput, activeOptionId} = this.state

    return (
      <div className="all-products-section">
        <div className="products-header-bg">
          <ProductsHeader
            onChange={this.onChange}
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
            searchInput={searchInput}
          />
        </div>
        {/* TODO: Update the below element */}
        <div className="products-section-bg">
          <div>
            <FiltersGroup
              onRating={this.onRating}
              onCategory={this.onCategory}
              categories={categoryOptions}
              ratings={ratingsList}
              onClear={this.onClear}
            />
          </div>
          <div className="fadjflks">
            {isLoading ? this.renderLoader() : this.renderProductsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllProductsSection
