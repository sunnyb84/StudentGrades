const QUIZ_COUNT = 5;

let form;

const $ = id => document.getElementById(id);

function addFakeData() {
  $('student-number').value = 'A12345678';
  $('last-name').value = 'B';
  $('first-name').value = 'Sani';
  $('q1').value = 80;
  $('q2').value = 85;
  $('q3').value = 90;
  $('q4').value = 95;
  $('q5').value = 100;
  $('mid-term').value = 85;
  $('problems').value = 80;
  $('final').value = 95;
}

function calculate() {
  if (!form.checkValidity()) return;

  // Create an array containing all the quiz scores, including the makeup.
  const quizScores = [getValue('makeup')];
  for (let q = 1; q <= QUIZ_COUNT; q++) {
    quizScores.push(getValue('q' + q));
  }

  // Sort the quiz scores in descending order.
  quizScores.sort((s1, s2) => s2 - s1);

  // Remove the lowest score which will be at the end.
  quizScores.pop();

  // Add the remaining quiz scores which will be the highest ones.
  const quizTotal = quizScores.reduce((acc, s) => acc + s, 0);

  const quizAvg = quizTotal / QUIZ_COUNT;

  const midTerm = getValue('mid-term');
  const problems = getValue('problems');
  const final = getValue('final');

  const isStarStudent = quizAvg >= 90 && midTerm >= 90 && problems >= 90;

  const courseAvg = isStarStudent
    ? (quizAvg + midTerm + problems) / 3
    : Math.round(
        0.5 * quizAvg + 0.15 * midTerm + 0.1 * problems + 0.25 * final
      );

  const grade =
    courseAvg >= 90
      ? 'A'
      : courseAvg >= 80
      ? 'B'
      : courseAvg >= 70
      ? 'C'
      : courseAvg >= 60
      ? 'D'
      : 'F';

  $('results').innerHTML =
    `Quiz Avg = ${quizAvg.toFixed(1)}, ` +
    `Course Avg = ${courseAvg.toFixed(2)}, ` +
    `Letter Grade = ${grade}`;
}

function clearScreen() {
  form.reset();
  $('results').innerHTML = '';
  $('student-number').focus();
}

const getValue = id => Number($(id).value);

window.onload = () => {
  form = document.querySelector('form');
  form.onsubmit = event => event.preventDefault();

  $('fake-btn').onclick = addFakeData;
  $('clear-btn').onclick = clearScreen;
  $('calc-btn').onclick = calculate;
  $('student-number').focus();
};
