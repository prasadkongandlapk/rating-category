import './index.css'

const Categories = props => {
  const {categoryDetails, onCategory} = props
  const {name} = categoryDetails

  const onClickCategory = () => {
    const {categoryId} = categoryDetails
    onCategory(categoryId)
  }

  return (
    <li>
      <button type="button" className="dfasklj">
        <p>{name}</p>
      </button>
    </li>
  )
}

const Ratings = props => {
  const {ratingDetails, onRating} = props
  const {imageUrl} = ratingDetails

  const onClickRating = () => {
    const {ratingId} = ratingDetails
    onRating(ratingId)
  }

  return (
    <li>
      <div className="jjdfskalk">
        <button onClick={onClickRating} type="button" className="dsfsjl">
          <img className="jkladfs" src={imageUrl} alt="rating" />
          <p>& up</p>
        </button>
      </div>
    </li>
  )
}

const FiltersGroup = props => {
  const {ratings, onRating, onCategory, categories} = props
  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <ul>
        {categories.map(each => (
          <Categories
            onCategory={onCategory}
            categoryDetails={each}
            key={each.categoryId}
          />
        ))}
      </ul>
      <h1>Rating</h1>
      <ul>
        {ratings.map(each => (
          <Ratings
            onRating={onRating}
            ratingDetails={each}
            key={each.ratingId}
          />
        ))}
      </ul>
      <button type="button" className="lkjfsdj">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
