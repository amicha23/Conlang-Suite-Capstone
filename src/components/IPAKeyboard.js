const IPAKeyboard = ({ list, soundList, setSoundList, curList, noDup }) => {
  console.log("LIST: ", curList, noDup )
  const writeLetter = (e, setListSound, list, curList, noDup) => {
    console.log("DDDD", curList, noDup)
    if (!curList.includes(e.target.value)) {
      setListSound((sounds) => [...sounds, e.target.value].join(""));
    }
    else if (noDup === false) {
      setListSound((sounds) => [...sounds, e.target.value].join(""));
    }
  };

  const createBtns = (list) => {
    return list.map((x) => {
      return (
        <button
          key={x}
          value={x}
          className="btn btn-letter"
          onClick={(e) =>
            writeLetter(e, setSoundList, soundList, curList, noDup, "sound-input")
          }
        >
          {x}
        </button>
      );
    });
  };

  return (
    <div className="input-letters">
      <div className="wrapper-ipa">{createBtns(list)}</div>
    </div>
  );
};

export default IPAKeyboard;