export default function ScoreButtons({ incrementScore, decrementScore }) {
    return (
      <div className="flex gap-3">
        <button
          className="bg-green-600 text-white text-lg py-1 px-3 rounded-lg hover:bg-green-700 transition-all duration-200"
          onClick={incrementScore}
        >
          +
        </button>
        <button
          className="bg-red-600 text-white text-lg py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200"
          onClick={decrementScore}
        >
          -
        </button>
      </div>
    );
  }
  