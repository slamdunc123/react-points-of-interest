import {Link} from 'react-router-dom'
import styles from './addPoint.module.css'


const AddPoint = () => {
  return (
    < div className={styles.container}>
    
    <Link to="/">Home</Link>
    <div>Add Point Contents</div>
    </div>
  )
}
export default AddPoint