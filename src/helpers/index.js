import { weekdays } from '../data/db.json';

/**
 * Get day of the week
 */
const getDay = () => {
  // Sunday - Saturday (0 - 6)
  let thisDay = new Date().getDay();
  // Monday - Sunday (0 - -1)
  thisDay = thisDay - 1;

  return thisDay;
};

const showLecture = () => {
  const now = new Date();
  const thisDay = now.getDay() - 1;
  const thisHour = now.getHours();
  const thisMinutes = now.getMinutes();
  let lectureIndex;

  // Sunday
  if (thisDay === -1) {
    return;
  }

  // Out of college time
  if (thisHour >= 17 || thisHour <= 7) {
    return;
  }

  if (thisHour >= 15) {
    if (thisMinutes >= 35) {
      lectureIndex = 7;
    } else {
      lectureIndex = 6;
    }
  } else if (thisHour >= 14) {
    if (thisMinutes >= 35) {
      lectureIndex = 6;
    } else {
      lectureIndex = 5;
    }
  } else if (thisHour >= 13) {
    if (thisMinutes >= 30) {
      lectureIndex = 5;
    } else {
      lectureIndex = 4;
    }
  } else if (thisHour >= 12) {
    if (thisMinutes >= 25) {
      lectureIndex = 4;
    } else {
      lectureIndex = 3;
    }
  } else if (thisHour >= 11) {
    if (thisMinutes >= 20) {
      lectureIndex = 3;
    } else {
      lectureIndex = 2;
    }
  } else if (thisHour >= 10) {
    lectureIndex = 2;
  } else if (thisHour >= 8) {
    lectureIndex = 1;
  } else {
    return;
  }

  if (lectureIndex === undefined) {
    return;
  }

  try {
    const lecture = document.querySelector(
      `#${weekdays[thisDay]}-${lectureIndex}`
    );

    if (lecture === null) return;

    if (window.innerWidth < 768) {
      lecture.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }

    setTimeout(() => {
      if (!lecture.classList.contains('lecture--selected')) {
        lecture.className += ' lecture--selected';

        setTimeout(() => {
          const className = lecture.className.replace(' lecture--selected', '');
          lecture.className = className;
        }, 2000);
      }
    }, 500);
  } catch (error) {
    // Element does not exists in DOM.
  }
};

export { getDay, showLecture };
