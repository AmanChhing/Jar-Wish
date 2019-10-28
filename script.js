

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
//const songpickedhtml = document.querySelector('.song-picked');
var url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0a16fe68-ad90-40c3-83c6-e6cc2250831e?verbose=true&timezoneOffset=0&subscription-key=51f106d2672240958a1f931a8d02eae3&q="
var topscoringintent = ""
var songpicked = ""
var youtubeoplist = ""
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  

  outputYou.textContent = text;
  getjsonfile()
  //var json_obj = JSON.parse(Get(url));
  //alert(json_obj.topScoringIntent)
  //$.getJSON(url, function(data) {
   // alert(data.topScoringIntent.intent)
	//});
  console.log('Confidence: ' + e.results[0][0].confidence);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

function getjsonfile() 
{
	//alert(url+outputYou.textContent)
	$.getJSON(url+outputYou.textContent, function(data) {
    window.topscoringintent = data.topScoringIntent.intent.toString();
	//alert(window.topscoringintent)
	playsongornot(data)
	});
}

function playsongornot(data)
{
	if(window.topscoringintent.toLowerCase() === "play")
	{
		//alert(data["entities"][0].entity)
		//alert(data.entities.length.toString())
		for(var i = 0; i < data.entities.length ; i++)
		{
			window.songpicked += data["entities"][i].entity.toString() + " "
		}
		if(window.songpicked != "")
		{
			outputBot.textContent = "Sure Sir, Playing the song : " + window.songpicked
			playsong()
		}
		//alert(window.songpicked)
	}
}

function playsong()
{
	//var res = encodeURI(window.songpicked)
	var ifrm = document.createElement('iframe');
	ifrm.setAttribute('id', 'ifrm'); // assign an id
	ifrm.setAttribute('height', '450'); // set height
	ifrm.setAttribute('width', '600'); // set width
	ifrm.setAttribute('allow', 'autoplay'); // set width
	ifrm.setAttribute('gesture', 'media'); // set width
	ifrm.setAttribute('frameborder', '0'); // set width
	ifrm.setAttribute('encrypted-media', 'allowfullscreen'); // set width
	var youtubeurl = "https://www.youtube.com/embed?listType=search&list="+window.songpicked
	document.body.appendChild(ifrm); // to place at end of document
	
	// to place before another page element
	//var el = document.getElementById('marker');
	//el.parentNode.insertBefore(ifrm, el);

	// assign url
	ifrm.setAttribute('src', youtubeurl);
	
	eventFire(document.getElementById('iframe'), 'click');
	//clickframe()
	//var res = encodeURI(window.songpicked)
    	//var youtubeUrl = "https://www.youtube.com/results?search_query=" + res
	//alert(youtubeUrl)
    	//var getHTML    = file_get_contents(youtubeUrl)
	//$.post("index.php", { url: youtubeUrl }, function(data) {
	//alert(data.toString())
    	//window.youtubeoplist = data        
	//});
	//alert(window.youtubeoplist)
    	//var pattern   = '/<a href="\/watch\?v=(.*?)"/i'
	//var matchs     = window.youtubeoplist.match(pattern)
	//alert(matchs)
    	//if(matchs!= "")
	//{
       	//	var videoID    = matchs[1]
	 //  	alert(videoID)
    	//}
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function clickframe()
{
	$('#ifrm').trigger("click")
	//document.getElementById("ifrm").click()
}



