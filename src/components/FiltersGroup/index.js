import './index.css'

const FiltersGroup = props => {
  const {ratings, onClear, onRating, onCategory, categories} = props

  const onClickClearBtn = () => {
    onClear()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <ul>
        {categories.map(each => {
          const onClickCategory = () => {
            onCategory(each.categoryId)
          }
          return (
            <li key={each.categoryId}>
              <button
                onClick={onClickCategory}
                type="button"
                className="dfasklj"
              >
                <p>{each.name}</p>
              </button>
            </li>
          )
        })}
      </ul>
      <h1>Rating</h1>
      {ratings.map(each => {
        const onClickRating = () => {
          onRating(each.ratingId)
        }
        return (
          <li key={each.ratingId}>
            <div className="jjdfskalk">
              <button onClick={onClickRating} type="button" className="dsfsjl">
                <img
                  className="jkladfs"
                  src={each.imageUrl}
                  alt={`rating ${each.ratingId}`}
                />
                <p>& up</p>
              </button>
            </div>
          </li>
        )
      })}
      <button onClick={onClickClearBtn} type="button" className="lkjfsdj">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
