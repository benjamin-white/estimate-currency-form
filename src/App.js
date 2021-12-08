import EstimateDonation from './components/EstimateDonation'
import Card             from './components/Card'
import styles           from './App.module.css'

const estimateProps = {
  heading: 'Support us from the US',
  conversion: 'USDGBP',
  labels: {
    amount: 'Amount (USD)',
    estimate: 'Estimate (GBP)'
  }
}

const App = () => {
  return (
    <main className="u-container">
      <section className={styles.app}>
        <div className={styles.appInner}>
          <EstimateDonation {...estimateProps} />
          <Card />
        </div>
      </section>
    </main>
  )
}

export default App
