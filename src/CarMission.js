import React, { useState } from 'react';
import './CarMission.css';
import big from './img/big.png';
import spider from './img/spider.png';
import sirene from './img/sirene.png';
import lock from './img/lock.png';
import car from './img/car.png';
import truck from './img/truck.png';
import bus from './img/bus.png';
import done from './img/done.png';
 
export default function App() {
  const [gameState, setGameState] = useState('intro'); // intro, level1, level2, level3, win
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
 
  // Состояния для Задания 1 (Инкапсуляция)
  const [incapsulationInput, setIncapsulationInput] = useState('');

  // Состояния для Задания 2 (Наследование)
  const [inheritanceChain, setInheritanceChain] = useState([]);
 
  // Состояния для Задания 3 (Полиморфизм / Перегрузка)
  const [polymorphismChoice, setPolymorphismChoice] = useState(null);
 
  // --- ЛОГИКА ИГРЫ ---
 
  // Проверка Уровня 1
const checkLevel1 = () => {
  // Защита от повторных кликов, пока идет анимация перехода
  if (gameState !== 'level1') return;

  const answer = incapsulationInput.trim().toLowerCase();

  if (answer === 'private') {
    setFeedbackType('success'); // Окрашиваем в зеленый цвет
    setFeedback('Правильно, private это абсолютный секрет! Доступен только внутри своего родного класса.');
    setScore(prevScore => prevScore + 10);
    
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
      setGameState('level2');
    }, 5000); // Увеличили до 3 секунд, чтобы ребенок успел прочитать длинный текст
    
  } else if (answer === 'protected') {
    setFeedbackType('error'); // Окрашиваем в красный цвет
    setFeedback('Почти, protected это семейная тайна. Переменная видна только классу и его детям-наследникам. Адрес это полный секрет!');
    
  } else if (answer === 'public') {
    setFeedbackType('error'); // Окрашиваем в красный цвет
    setFeedback('Ой-ой, это public! Так адрес увидят абсолютно все классы и даже мошенники! Срочно прячем обратно.');
    
  } else {
    setFeedbackType('error');
    setFeedback(
      'Неверный ввод. Введи один из трёх модификаторов доступа: "private", "protected" или "public".'
    );
  }
};

  // Проверка Уровня 2
  const handleInheritanceClick = (step) => {
    const nextChain = [...inheritanceChain, step];
    setInheritanceChain(nextChain);
 
    // Проверяем правильность цепочки: Транспорт -> Грузовая машина -> Фура
    if (nextChain.length === 1 && step !== 'Транспорт') resetChain();
    if (nextChain.length === 2 && step !== 'Грузовик') resetChain();
    if (nextChain.length === 3) {
      if (step === 'Фура') {
        setFeedbackType('success');
        setFeedback('Отлично! Фура унаследовала всё от Грузовика, а тот — от Транспорта!');
        setScore(score + 10);
        setTimeout(() => {
          setFeedback('');
          setGameState('level3');
        }, 4000);
      } else {
        resetChain();
      }
    }
  };
 
  const resetChain = () => {
    setFeedbackType('error');
    setFeedback('Ой, цепочка наследования нарушена! Попробуй еще раз.');
    setInheritanceChain([]);
  };
 
  // Проверка Уровня 3 (Имитация перегрузки метода на C#)
  // В C# полиморфизм (перегрузка) позволяет иметь методы с одинаковым именем, но разными параметрами:
  // DrawShape(int radius) - рисует круг
  // DrawShape(int width, int height) - рисует прямоугольник
  const selectPolymorphism = (type) => {
  // Защита от кликов после того, как правильный ответ уже найден и запускается переход
  if (gameState !== 'level3' && polymorphismChoice === 'circle') return;

  setPolymorphismChoice(type);

  if (type === 'circle') {
    setFeedbackType('success');
    setFeedback('Всё верно! Дом Сшарпика как раз находится на круглой Академической площади. Метод DrawShape(radius) с одним числом сработал отлично!');
    setScore(prevScore => prevScore + 10);
    
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
      setGameState('win');
    }, 6000); // 4 секунды, чтобы ребенок успел рассмотреть карту и прочитать текст
  } else if (type === 'rect') {
    setFeedbackType('error');
    setFeedback('Ой, получился прямоугольный перекрёсток! Но ведь дом Сшарпика стоит на Академической площади, она должна быть круглой. Попробуй ещё раз!');
  } else if (type === 'triangle') {
    setFeedbackType('error');
    setFeedback('Ой, вышел треугольник! Но навигатор говорит, что площадь круглая. Давай выберем другое количество чисел!');
  }
};
 
  return (
<div className='container'>
<header className='header'>
<h2 className='header_title' style={{color: '#D2691E'}}> 
    Приключения Сшарпика: дорога к другу
<img src={bus} width={110} height={100} alt='bus' loading="lazy" />
<p className='score' style={{color: '#9370DB'}}>Баллы Кодера: {score}</p>
</h2>
</header>
 
      <main className='mainBox'>
        {/* --- СЮЖЕТНЫЙ ВВОД --- */}
        {gameState === 'intro' && (
<div className='card'>
<h2 style={{color: '#FF0000'}}> <img src={sirene} width={30} height={30} alt='sirene'/> 
Сшарпик попал в беду!
</h2>
<p>Сшарпик ехал на автобусе к другу в соседний город, но у него разрядился телефон. 
  Он помнит только адрес друга, но не знает, как добраться от вокзала. 
  На его счастье он встречает детектива Вебку.</p>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '15px auto' }}> 
    <img src={spider} width={110} height={110} alt='spider' loading="lazy" style={{ flexShrink: 0 }} />
    <div>
        <strong>Детектив Вебка:</strong> "Кодер, мы должны помочь. Нам нужно проложить маршрут 
        к другу Сшарпика! Используй правила C#, чтобы запустить навигатор!"
    </div>
</div>
<button className='button' onClick={() => setGameState('level1')}>Начать спасение!</button>
</div>
        )}
 
        {/* --- УРОВЕНЬ 1: ИНКАПСУЛЯЦИЯ --- */}
        {gameState === 'level1' && (
<div className='card'>
<h2>Уровень 1: Защита данных (Инкапсуляция) 
    <img src={lock} width={60} height={60} alt='lock'/>
    </h2>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '15px auto' }}> 
    <img src={spider} width={110} height={110} alt='spider' loading="lazy" style={{ flexShrink: 0 }} />
    <div>
        <strong>Детектив Вебка:</strong> 
        "Чтобы мошенники не узнали адрес друга Сшарпика, мы должны спрятать его в сейф внутри класса!
        В ООП таким сейфом является <strong style={{color: '#FF0000'}}>инкапсуляция</strong>! 
        Какое ключевое слово в C# сделает адрес <strong style={{color: '#FF0000'}}>
          доступным только внутри класса</strong>?"
    </div>
</div>
<div className='codeBlock'>
<code>
<span>... string friendAddress = "ул. Программистов, д. 5";</span>
</code>
</div>

            <input 
              type="text" 
              placeholder="Введи модификатор доступа (private, protected или public)" 
              value={incapsulationInput}
              onChange={(e) => setIncapsulationInput(e.target.value)}
              className='input'
            />
<button className='button' onClick={checkLevel1}>Применить инкапсуляцию</button>
            {feedback && (
              <p className={`feedback ${feedbackType}`}>
                {feedback}
              </p>
            )}
</div>
        )}
 
        {/* --- УРОВЕНЬ 2: НАСЛЕДОВАНИЕ --- */}
        {gameState === 'level2' && (
<div className='card'>
<h2>
    Уровень 2: Создаем машину (Наследование) 
    </h2>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '15px auto' }}> 
    <img src={spider} width={110} height={110} alt='spider' loading="lazy" style={{ flexShrink: 0 }} />
    <div>
        <strong>Детектив Вебка:</strong> "Автобус Сшарпика сломался! Нам нужно отправить за ним попутную большую фуру! Давай построим правильную цепочку 
        <strong style={{color: '#FF0000'}}> наследования классов</strong> от общего к частному!"
    </div>
</div>
<p><em>Нажимай на кнопки в правильном порядке: Родитель ➡️ Наследник ➡️ Финальный класс</em></p>
 
<div className='btnGroup'>
<button className='gameBtn' onClick={() => handleInheritanceClick('Фура')}>
    <img src={big} alt="Фура" style={{ width: '40px', height: '40px', marginRight: '8px', verticalAlign: 'middle' }} />
    Фура
</button>
<button className='gameBtn' onClick={() => handleInheritanceClick('Транспорт')}>
    <img src={car} alt="Фура" style={{ width: '40px', height: '40px', marginRight: '8px', verticalAlign: 'middle' }} />
    Транспорт
</button>
<button className='gameBtn' onClick={() => handleInheritanceClick('Грузовик')}>
    <img src={truck} alt="Фура" style={{ width: '40px', height: '40px', marginRight: '8px', verticalAlign: 'middle' }} />
    Грузовик
    </button>
</div>
 
            <div className='chainDisplay'>
<strong>Твоя цепочка:</strong> {inheritanceChain.join(' ➡️ ')}
</div>
            {feedback && (
              <p className={`feedback ${feedbackType}`}>
                {feedback}
              </p>
            )}
</div>
        )}
 
       {/* --- УРОВЕНЬ 3: ПОЛИМОРФИЗМ --- */}
{gameState === 'level3' && (
  <div className='card'>
    <h2>Уровень 3: Рисуем карту (Полиморфизм)</h2>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '15px auto' }}> 
      <img src={spider} width={110} height={110} alt='spider' loading="lazy" style={{ flexShrink: 0 }} />
      <div> 
        <strong>Вебка:</strong> "Нам нужно нарисовать на карте <strong>Академическую площадь</strong>! 
        В C# существует <strong style={{color: '#FF0000'}}>перегрузка методов</strong>. <strong style={{color: '#FF0000'}}>Метод </strong>называется одинаково <code style={{color: '#FF0000'}}>DrawShape()</code>, но рисует разные фигуры! Дашь ему 1 число - он сделает круг, дашь 2 числа - прямоугольник, а дашь 3 числа - треугольник!"
      </div>
    </div>
    
    <p style={{ fontWeight: 'bold', color: '#008000' }}>
      Вспомни, как выглядит Академическая площадь, и выбери правильный метод для Сшарпика:
    </p>
    
    <div className='btnGroup' style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', margin: '15px 0' }}>
      <button className='gameBtn' onClick={() => selectPolymorphism('circle')}>
        <code>DrawShape(int radius)</code> <br/> Круглая площадь (1 число)
      </button>
      <button className='gameBtn' onClick={() => selectPolymorphism('rect')}>
        <code>DrawShape(int w, int h)</code> <br/> Перекрёсток (2 числа)
      </button>
      <button className='gameBtn' onClick={() => selectPolymorphism('triangle')}>
        <code>DrawShape(int a, int b, int c)</code> <br/> Треугольник (3 числа)
      </button>
    </div>
     
    {/* Симуляция экрана навигатора */}
    {polymorphismChoice && (
      <div className='canvasSim' style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {polymorphismChoice === 'circle' && (
          <div className='circle' style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#00FA9A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#000080' }}>
            Сшарпик тут!
          </div>
        )}
        {polymorphismChoice === 'rect' && (
          <div className='rectangle' style={{ width: '15px', height: '80px', backgroundColor: '#1E90FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#000080' }}>
            Сшарпик тут!
          </div>
        )}
        {polymorphismChoice === 'triangle' && (
          <div className='triangle' style={{ width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '100px solid #FFFF00', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ position: 'absolute', top: '40px', left: '-45px', width: '90px', textAlign: 'center', fontWeight: 'bold', color: '#000080', fontSize: '14px' }}>
              Сшарпик тут!
            </span>
          </div>
        )}
      </div>
    )}

    {feedback && <p className={`feedback ${feedbackType}`}>{feedback}</p>}
  </div>
)}

        {/* --- ФИНАЛ --- */}
        {gameState === 'win' && (
<div className='card'>
<h2>
  <img src={done} width={60} height={60} alt='done'/> 
  Ура! Миссия выполнена!
  </h2>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '15px auto' }}> 
      <img src={spider} width={110} height={110} alt='spider' loading="lazy" style={{ flexShrink: 0 }} />
  <div> 
  <strong>Вебка:</strong> "Фура доставила Сшарпика прямо по адресу, благодаря твоей карте! Ты отлично справился с ООП на C#! Инкапсуляция, Наследование и Перегрузка методов были очень полезны!"
  </div>
  </div>
<h3>Финальный счет: {score} очков!</h3>
<button className='button' onClick={() => {
              setGameState('intro');
              setScore(0);
              setInheritanceChain([]);
              setPolymorphismChoice(null);
              setIncapsulationInput('');
              setFeedback('');
            }}>Играть снова</button>
</div>
        )}
</main>
</div>
  );
}