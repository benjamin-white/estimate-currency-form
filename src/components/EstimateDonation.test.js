import { render, screen, waitFor } from '@testing-library/react'
import userEvent                   from '@testing-library/user-event'
import EstimateDonation            from './EstimateDonation'

describe('The EstimateDonation component', () => {

  const stubbedProps = {
    conversion: 'USDGBP',
    labels: {
      amount: 'Amount (USD)',
      estimate: 'Estimate (GBP)'
    }
  }

  const failureMessage = 'Sorry an unexpected error occured, please try again later'

  const jestFetch = (responseData, success=true) => 
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        ok: success,
        json: () =>
          Promise.resolve(responseData)
      })
    )

  it('should render the correct inputs and submit button', () => {

    render(<EstimateDonation {...stubbedProps} />)

    const amountInput   = screen.getByLabelText(/amount/i)
    const estimateField = screen.getByLabelText(/estimate/i)
    const submitButton  = screen.getByText(/calculate/i)

    expect(amountInput.type).toEqual('text')
    expect(estimateField.type).toEqual('text')
    expect(submitButton.type).toEqual('submit')

  })

  it('should display the typed value as formatted currency', () => {

    render(<EstimateDonation {...stubbedProps} />)

    const amountInput = screen.getByLabelText(/amount/i)
    userEvent.type(amountInput, '50.001')
  
    expect(amountInput).toHaveValue('50.00')

  })

  it('should calculate and display an estimate', async () => {

    const fetchMock = jestFetch({
      quotes: {
        USDGBP: .7194
      }
    })

    render(<EstimateDonation {...stubbedProps} />)

    const amountInput   = screen.getByLabelText(/amount/i)
    const estimateField = screen.getByLabelText(/estimate/i)

    userEvent.type(amountInput, '50')
    userEvent.click(screen.getByText(/^calculate$/i))
    
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(estimateField).toHaveValue('35.97')
    
  })

  it('should handle API failure', async () => {

    render(<EstimateDonation {...stubbedProps} />)
    
    const fetchMock    = jestFetch({}, false)
    const consoleWarn  = jest.spyOn(console, 'warn')
    const submitButton = screen.getByText(/^calculate$/i)
    const messageArea  = submitButton.nextSibling

    userEvent.click(submitButton)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(consoleWarn).toBeCalledWith('Unable to fetch from https://founderspledge.github.io/fp-interview-exercise-api/currency.json')
    expect(messageArea).toHaveTextContent(failureMessage)

  })

  it('should handle missing conversion keys', async () => {

    render(<EstimateDonation {...stubbedProps} />)

    const fetchMock    = jestFetch({quotes: {}})
    const consoleWarn  = jest.spyOn(console, 'warn')
    const submitButton = screen.getByText(/^calculate$/i)
    const messageArea  = submitButton.nextSibling

    userEvent.click(submitButton)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(consoleWarn).toBeCalledWith(`No matching conversion found for given: ${stubbedProps.conversion}`)
    expect(messageArea).toHaveTextContent(failureMessage)

  })

  it('should round the estimate to two decimal places', async () => {

    const fetchMock = jestFetch({
      quotes: {
        USDGBP: .7194
      }
    })

    render(<EstimateDonation {...stubbedProps} />)

    const amountInput   = screen.getByLabelText(/amount/i)
    const estimateField = screen.getByLabelText(/estimate/i)

    userEvent.type(amountInput, '1')
    userEvent.click(screen.getByText(/^calculate$/i))
    
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(estimateField).toHaveValue('0.72')

  })

})