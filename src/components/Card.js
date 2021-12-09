import styles from './Card.module.css'

const Card = () => 
  <div>
    <div className={`${styles.card} u-dropShadow`}>
      <h1 className="u-colorAccent">IndiePledge</h1>
      <address>London, United Kingdom</address>
      <p>We're finding solutions to the world's most pressing problems through evidence-led and thoughtful approaches to impact.</p>
    </div>
  </div>

export default Card