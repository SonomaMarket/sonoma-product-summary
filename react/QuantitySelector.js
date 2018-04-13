import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* Quantity selector component.
*/
class QuantitySelector extends Component {
  handleChange = (event) => {
    const maxQuantity = this.props.maxQuantity
    let value = event.target.value
    let quantity = (value) ? parseInt(value, 10) : 0
    if (quantity > maxQuantity) {
      quantity = maxQuantity
      this.props.onMaxReached()
    } else if (quantity < 0) {
      quantity = 0
    }
    event.target.value = quantity
    this.props.onQuantityChange(quantity)
  }

  render() {
    const { maxQuantity, currentQuantity } = this.props
    return (<input className="f4 dark-gray br2-l" type="number" name="quantity"
      min="0" max={maxQuantity} value={currentQuantity} onChange={this.handleChange} />)
  }
}

QuantitySelector.propTypes = {
  /** Product's maximum quantity that the client can buy */
  maxQuantity: PropTypes.number.isRequired,
  /** Current quantity to be setted as the initial value */
  currentQuantity: PropTypes.number.isRequired,
  /** Called when the client set the quantity selector */
  onQuantityChange: PropTypes.func.isRequired,
  /** Define if can buy more items than the maximum limit */
  onMaxReached: PropTypes.func.isRequired,
}

export default QuantitySelector
