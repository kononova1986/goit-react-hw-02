import { useEffect, useState } from 'react';
import Description from './Description/Description';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import Notification from './Notification/Notification';

function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });
  useEffect(() => {
    window.localStorage.setItem('saved-clicks', JSON.stringify(clicks));
  }, [clicks]);

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad || null;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((clicks.good / totalFeedback) * 100) : 0;

  const updateFeedback = feedbackType => {
    switch (feedbackType) {
      case 'good':
        setClicks({ ...clicks, good: clicks.good + 1 });
        break;
      case 'neutral':
        setClicks({ ...clicks, neutral: clicks.neutral + 1 });
        break;
      case 'bad':
        setClicks({ ...clicks, bad: clicks.bad + 1 });
        break;
      case 'reset':
        setClicks({ good: 0, neutral: 0, bad: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
export default App;
