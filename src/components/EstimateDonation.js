import { useState }     from 'react'
import formatAsCurrency from '../inc/format-as-currency'
import styles           from './EstimateDonation.module.css'

const EstimateDonation = ({ heading, conversion, currencyToSymbol, labels, placeholders }) => {

  const [amount, setAmount]     = useState('')
  const [estimate, setEstimate] = useState('')
  const [message, setMessage]   = useState('')
  const errorMessage            = 'Sorry an unexpected error occured, please try again later'
  const endpoint                = 'https://founderspledge.github.io/fp-interview-exercise-api/currency.json'

  const handleAmount = ({ target }) => {
    setAmount(formatAsCurrency(target.value))
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      const response = await fetch(endpoint)

      if (!response.ok) {
        console.warn(`Unable to fetch from ${endpoint}`)
        setMessage(errorMessage)
        return
      }

      const data = await response.json()
      const rate = data.quotes && data.quotes[conversion]

      if (!rate) {
        console.warn(`No matching conversion found for given: ${conversion}`)
        setMessage(errorMessage)
        return
      }

      setEstimate(`${currencyToSymbol}${(amount * rate).toFixed(2)}`)

    } catch (error) {

      console.error(error)
      setMessage(errorMessage)

    }

  }

  return (
    <div className={styles.form}>
      { heading ? <h2>{heading}</h2> : ''}
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor="amount">{labels.amount || ''}</label>
          <input type="text" name="amount" id="amount" value={amount} placeholder={placeholders.amount || ''} autoFocus onChange={handleAmount} />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="estimate">{labels.estimate || ''}</label>
          <input type="text" name="estimate" id="estimate" value={estimate} placeholder={placeholders.estimate || ''} readOnly />
        </div>
        <input type="submit" value="Calculate" className="Button" />
        <div className={styles.formFeedback}>{message}</div>
      </form>
    </div>
  )

}

export default EstimateDonation