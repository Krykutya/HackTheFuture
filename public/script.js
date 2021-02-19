const peer = new Peer({
    key: '',
    debug: 3
  });

peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});


// 発信処理
document.getElementById('make-call').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
  };
  
  // イベントリスナを設置する関数
  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      // video要素にカメラ映像をセットして再生
      const videoElm = document.getElementById('their-video')
      videoElm.srcObject = stream;
      videoElm.play();
    });
  }

  peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
  });

	function getPeerlist(appid, callback) {
		_createAjaxRequest('get', 'peers/list/' + appid, null, true, function (data) {
			callback(data);
		}, function (error) {
			callback(error);
		});
	};