import css from './Options.module.css';

export default function Options({ updateFeedback, totalFeedback }) {
  return (
    <div className={css.wrap}>
      <button onClick={() => updateFeedback('good')}>Good</button>
      <button onClick={() => updateFeedback('neutral')}>Neutral</button>
      <button onClick={() => updateFeedback('bad')}>Bad</button>
      {totalFeedback && (
        <button onClick={() => updateFeedback('reset')}>Reset</button>
      )}
    </div>
  );
}
