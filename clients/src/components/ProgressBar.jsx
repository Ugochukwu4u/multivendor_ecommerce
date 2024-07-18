import './progressbar.scss';

const ProgressBar = ({totalItems, itemsLeft}) => {
    const progress =  (itemsLeft /  totalItems) * 100;
  return (
    <div className='progress-bar'>
    <div className="progress-bar-fill" style={{width: `${progress}%`}}>
    </div>
    </div>
  )
}

export default ProgressBar