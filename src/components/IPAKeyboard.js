const IPAKeyboard = ({ list, soundList, setSoundList }) => {
  const writeLetter = (e, setListSound, list) => {
    if (!list.includes(e.target.value))
      setListSound((sounds) => [...sounds, e.target.value]);
  };

  const createBtns = (list) => {
    return list.map((x) => {
      return (
        <button
          key={x}
          value={x}
          className="btn btn-letter"
          onClick={(e) =>
            writeLetter(e, setSoundList, soundList, "sound-input")
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
