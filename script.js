//Communication with the server
	
	//Get All Albums
	function getAllAlbums(){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist",     
			method:"GET"
		}).done(function( data, textStatus, reqObj ) {
           createAlbumList(data.data);
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//Get Album by ID
	function getAlbum(idnmbr){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist/" + idnmbr,     
			method:"GET"
		}).done(function( data, textStatus, reqObj ) {
           builalbuminfo(data.data);
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//Get Album's songs
	function getAlbumSongs(idnmbr){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist/" + idnmbr + "/songs",     
			method:"GET"
		}).done(function( data, textStatus, reqObj ) {
           buildalbumsongs(data.data);
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//Create Album
	function createAlbum(albumData){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist",
			data:albumData,
			method:"POST"
		}).done(function( data, textStatus, reqObj ) {
           console.log(data.data);
		   reload();
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//Update album info
	function updateAlbumInfo(albumData, idnmbr){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist/" + idnmbr,
			data:albumData,
			method:"POST"
		}).done(function( data, textStatus, reqObj ) {
           console.log(data.data);
		   reload();
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//update album's songs
	function updateAlbumSongs(albumData, idnmbr){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist/" + idnmbr + "/songs",
			data:albumData,
			method:"POST"
		}).done(function( data, textStatus, reqObj ) {
           console.log(data.data);
		   reload();
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	//Delete Album
	function deleteAlbum(idnmbr){
		$.ajax({
			url:"http://playlist.jbfullstack.com/" + "playlist/" + idnmbr,
			method:"DELETE"
		}).done(function(textStatus, reqObj ) {
           console.log("okokokok", textStatus, reqObj );
		   reload();
       }).fail(function( reqObj, textStatus ) {  
           console.log("error from server call");
        });
	}
	
	
	//Refresh the page
	function reload(){
		location.reload();
	}
	
	
	
	
	
//Create Album
	function createAlbumList(dataAlb){
		$(".row > .playerdiv > .playerctr > div").css("background-image", "url('http://sd.keepcalm-o-matic.co.uk/i/keep-calm-choose-your-favorite-song-to-play-1.png')");
		//Dod Divs
		var albnamarr=[];
		for(var i in dataAlb){
			$("#thelist").append('<div albumid='+dataAlb[i].id+' albname='+dataAlb[i].name+' albimage='+dataAlb[i].image+' class="col-sm-3"><div class="curved"><h1></h1></div><div class="imagearea" style="background-image:url('+dataAlb[i].image+');"><span class="delete"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></span><span class="edit"><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></span><br><span class="play"><i class="fa fa-play fa-2x" aria-hidden="true"></i></span></div></div></div>');
			$(".searcharea>select").append('<option value='+dataAlb[i].id+'>'+dataAlb[i].name+'</option>');
			albnamarr[i]=dataAlb[i].name;
			console.log(dataAlb[i].image);
		}
		
		
		//Curve titles
		var rndtitles = $(".curved > h1"); 
		for(var j=0; j<rndtitles.length; j++){
			var eachtitle = rndtitles[j];
			var str = albnamarr[j];
			var curvclass = '';
			for (var k = 0, len = str.length; k < len; k++) {
					   curvclass += '<span class="char'+k+'">'+str[k]+'</span>';
			}
			$(eachtitle).html(curvclass);           
		}
		
		//Apply functionalities
		$(".delete > i").click(function(){
			var myid = $(this).parents(':eq(2)').attr('albumid');
			areyousuretodelete(myid);
		}); 
		
		$(".edit > i").click(function(){
			var myid = $(this).parents(':eq(2)').attr('albumid');
			var myname = $(this).parents(':eq(2)').attr('albname');
			var myimage = $(this).parents(':eq(2)').attr('albimage');
			editAlbum(myid, myname, myimage);
		}); 
		
		$(".play > i").click(function(){
			$(".playarea").removeClass("hidden");
			$('.playarea > .playersetting > i.fa-times-circle').click(function(){
				$(".playarea").addClass("hidden");
			});
			var myid = $(this).parents(':eq(2)').attr('albumid');
			getAlbum(myid);
			getAlbumSongs(myid);
		}); 
	}
	
	
	
	
	//Verify before delete
	function areyousuretodelete(delid){ 
		var r = confirm("Are you sure you want to DELETE this album!");
		if (r == true) {
			deleteAlbum(delid);
		}
	}
	
	
	
	
	
	//Build Player
	function builalbuminfo(aldata){
		$(".row > .playerdiv > .playerctr > div").css("background-image", "url('"+aldata.image+"')");
		$(".row > .playerdiv > .playerctr").attr("albumid", aldata.id);
		$(".row > .playerdiv > .playerctr > #playpause > i").click(function(){
			playpausethesong();
		}); 
	}
	var whitenow,
		whitebefore;
	function buildalbumsongs(songdata){
		whitenow = whitebefore = null;
		var totalnmbr = (songdata.songs.length);
		console.log(totalnmbr);
		$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist").empty();
		for(var i in songdata.songs){
			$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist").append('<li nam="'+songdata.songs[i].name+'" nmbr="'+((i*1)+1)+'" url="'+songdata.songs[i].url+'">'+songdata.songs[i].name+'</li>');
		}
		
		var fsturl = $(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li:first-of-type").attr('url');
		var fstnmbr=$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li:first-of-type").attr('nmbr');
		var fstnam=  $(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li:first-of-type").attr('nam');
		$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li:first-of-type").addClass('white');
		playthesong(fsturl,fstnmbr,fstnam);
		
		
		$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li").dblclick(function(){
			var theurl = $(this).attr('url');
			var thenmbr = $(this).attr('nmbr');
			var thenam = $(this).attr('nam');
			playthesong(theurl, thenmbr, thenam);
		});
		$(".row > .playerdiv > .playerright > .playerbar > audio").click(function(event){
			event.preventDefault();
			if($(".row > .playerdiv > .playerright > .playerbar > audio").attr("trigger", 'pause')){
				pausethesong();
			}else if($(".row > .playerdiv > .playerright > .playerbar > audio").attr("trigger", 'play')){
				playthesong();
			}
		}).on("ended", function() {
			var thisnmbr = ($(".row > .playerdiv > .playerright > .playerbar > audio").attr("nmbr")*1);
		    if(thisnmbr < totalnmbr){
				thisnmbr++;
				console.log(thisnmbr);
				playthesong(songdata.songs[thisnmbr-1].url, thisnmbr, songdata.songs[thisnmbr-1].name);
			}else{
				pausethesong();
			}
		});
		$('.playarea > .playersetting > i.fa-pencil').click(function(){
			editAlbumSongs(songdata);
		});
	}
	
	function playthesong(url, nmbr, nam){
		if(url && nmbr && nam){
			whitebefore = whitenow;
			whitenow=(nmbr*1);
			$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li").eq(whitenow-1).addClass('white');
			if(whitebefore != null){
				$(".row > .playerdiv > .playerright > .playerlist > #songplayinglist > li").eq(whitebefore-1).removeClass('white');
			}
			$(".row > .playerdiv > .playerright > .playerbar > audio").attr("src",url)
			$(".row > .playerdiv > .playerright > .playerbar > audio").attr("nmbr",nmbr);
			$(".row > .playerdiv > .playerright > .playerbar > audio").attr("nam",nam);
			$(".row > .playerdiv > .playerright > h5 > span").html(nam);
		}
		$(".row > .playerdiv > .playerright > .playerbar > audio").trigger('play');
		$(".row > .playerdiv > .playerctr > #playpause > i").attr('class', "fa fa-pause-circle-o fa-3x");
		$(".row > .playerdiv > .playerctr > div").attr('class', "makespin");
	}
	
	function pausethesong(){
		$(".row > .playerdiv > .playerright > .playerbar > audio").trigger('pause');
		$(".row > .playerdiv > .playerctr > div").attr('class', "");
		$(".row > .playerdiv > .playerctr > #playpause > i").attr('class', "fa fa-play-circle-o fa-3x");
	}

	function playpausethesong(){
		if ($(".row > .playerdiv > .playerctr > #playpause > i").attr('class') == "fa fa-play-circle-o fa-3x"){
			if($(".row > .playerdiv > .playerright > .playerbar > audio").attr("src")){
					playthesong();
				}
		}else if($(".row > .playerdiv > .playerctr > #playpause > i").attr('class') == "fa fa-pause-circle-o fa-3x"){
					pausethesong();
		}
	}
	
	
	
	
	// Search Bar 

    $(".searcharea > select").select2({
        placeholder: "Search An Album..",
		allowClear: true
    });
	
	var valid;
    $(".searcharea > select").on("select2:select", function(){
        valid = ($(".searcharea > select").val()*1);		
    });
	$(".searcharea > button").click(function(){
			$(".playarea").removeClass("hidden");
			$('.playarea > .playersetting > i.fa-times-circle').click(function(){
				$(".playarea").addClass("hidden");
			});
			getAlbum(valid);
			getAlbumSongs(valid);
			valid="";
			$(".searcharea > select").val('');
		});
	
	//Modal functions	
		
	var modal = document.getElementById('myModal');
	var modal2 = document.getElementById('modalsongs');

	var btn = document.getElementById("myBtn");
	var btn2 = document.getElementById("nextt-btn");

	var span = document.getElementsByClassName("close")[0];
	var span2 = document.getElementsByClassName("close")[1];
	
	// When the user clicks the button, open the modal
	btn.onclick = function() {
		$("#myModal > div > div.modal-body > div > img").attr('src',"");
		$("#myModal .modal-body #playlist-Name").val('');
		$("#myModal .modal-body #previewImg").val('');
		modal.style.display = "block";
	}
	if ($("#myModal .modal-body #chgbut a button").attr("id") == "submitsave"){
		btn2.onclick = function() {
			var playlist1 = {}
			var playlistname = $("#playlist-Name").val();
			var previmg = $("#previewImg").val(); 
			playlist1["name"] = playlistname;
			playlist1["image"] = previmg;
			var id = $("#myModal .modal-body #chgbut a button").attr("index");
	   
			console.log("playlist = ", playlist1);
			updateAlbumInfo(playlist1, id);
			$('#playlist-Name').val(''); 
			$('#previewImg').val('');
			$('#songs-ctr').empty();
			modal.style.display = "none";
			modal2.style.display = "none";
			
			$("#myModal h4.modal-title").html("Add New Playlist");
			$("#myModal .modal-body #playlist-Name").val('');
			$("#myModal .modal-body #previewImg").val('');
			$("#myModal .modal-body #chgbut a button").html("Next");
			$("#myModal .modal-body #chgbut a").attr("id","nextt-btn");
			$("#myModal .modal-body #chgbut a button").attr("index", "");
		}
	}else{
		btn2.onclick = function() {
			modal2.style.display = "block";
		}
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
			$("#myModal .modal-body #playlist-Name").val('');
			$("#myModal .modal-body #previewImg").val('');
			$("#myModal h4.modal-title").html("Add New Playlist");
			$("#myModal > div > div.modal-body > div > img").attr('src',"");
			$("#myModal .modal-body #chgbut a button").html("Next");
	}
	
	span2.onclick = function() {
		modal2.style.display = "none";
		$("#modalsongs > .modal-content > .modal-header > h4.modal-title").html("Add Playlist Songs");
			$("#modalsongs > .modal-content > #songs-ctr").empty();
			$("#modalsongs > .modal-content > #songs-ctr").append("<div>Song URL: <input class='songUrl' type='text' size='35' value='song1' name='surl'> Name: <input type='text' value='name1' name='nurl'></div><div>Song URL: <input class='songUrl' type='text' size='35' value='song1' name='surl'> Name: <input type='text' value='name1' name='nurl'></div>");
			$("#myModal .modal-body #chgbut a").attr("id","nextt-btn");
			$("#myModal .modal-body #chgbut a button").attr("index", "");
	}
		
		
	//Image Preview
		$("#previewImg").on("change keyup paste", function(){
			var thatImg = $("#previewImg").val();
			$("#myModal > div > div.modal-body > div > img").attr('src', thatImg);
		});
		
//----create playlist-----
//Add other songs
$("#add-song").on("click", function(){
    $("#modalsongs > div > div.modal-body").append("<div>Song URL: <input class='songUrl' type='text' size='35' value='song1' name='surl'> Name: <input type='text' value='name1' name='nurl'></div>"); 
});

//Remove last song
$("#remove-last").on("click", function(){
    $("#modalsongs > div > div.modal-body > div:last").remove();
});

//Build playlist
    var playlist = {};
    $("#next-btn").on("click", function(){
        var playlistname = $("#playlist-Name").val();
        var previmg = $("#previewImg").val(); 
        playlist["name"] = playlistname;
        playlist["image"] = previmg;
		if($("#myModal .modal-body #chgbut a button").html()=="Submit"){
			var idthis = ($("#myModal .modal-body #chgbut a button").attr("index")*1);
			$("#myModal .modal-body #playlist-Name").val('');
			$("#myModal .modal-body #previewImg").val('');
			updateAlbumInfo(playlist, idthis);
		}
		
		modal.style.display = "none";
    });
 
    $("#finishSave").on("click", function(){
        playlist["songs"] =[];
		
		$('#songs-ctr').children('div').each(function () {
			var divChild = $(this).children(); 
            var songurl = divChild[0].value;
            var songname = divChild[1].value;
            var songsObj ={"name":songname, "url": songurl};
			
            playlist["songs"].push(songsObj);
			console.log(playlist["songs"]);
		});	
		
		if($("#modalsongs > .modal-content > .modal-header > h4.modal-title").html() == "Edit Playlist Songs"){
			var zeut = $(".row > .playerdiv > .playerctr").attr("albumid");
			$("#modalsongs > .modal-content > .modal-header > h4.modal-title").html("Add Playlist Songs");
			$("#modalsongs > .modal-content > #songs-ctr").empty();
			$("#modalsongs > .modal-content > #songs-ctr").append("<div>Song URL: <input class='songUrl' type='text' size='35' value='song1' name='surl'> Name: <input type='text' value='name1' name='nurl'></div><div>Song URL: <input class='songUrl' type='text' size='35' value='song1' name='surl'> Name: <input type='text' value='name1' name='nurl'></div>");
			updateAlbumSongs(playlist, zeut);
		}else{
			createAlbum(playlist);
			$('#playlist-Name').val(''); 
			$('#previewImg').val('');
			$('#songs-ctr').empty();
		}
		modal2.style.display = "none";
    });
	
	//Clear
	$("#clear").click(function(){
	   $('#playlist-Name').val(''); 
	   $('#previewImg').val('');
	});

	//Update the album info page
	function editAlbum(id, name, img){
		$("#myModal h4.modal-title").html("Edit Playlist");
		$("#myModal .modal-body #playlist-Name").val(name);
		$("#myModal .modal-body #previewImg").val(img);
		$("#myModal .modal-body #chgbut a button").attr("id","submitsave");
		$("#myModal .modal-body #chgbut a button").attr("index", id);
		$("#myModal > div > div.modal-body > div > img").attr('src', img);
		$("#myModal .modal-body #chgbut a button").html("Submit");
		$("#myModal .modal-body #chgbut a").attr("id","idchanged");
		
		modal.style.display = "block";
	}
		
	//Update the playlist page
    function editAlbumSongs(data){
		$("#modalsongs > .modal-content > .modal-header > h4.modal-title").html("Edit Playlist Songs");
		$("#modalsongs > .modal-content > #songs-ctr").empty();
		for(var i in data.songs){
			$("#modalsongs > .modal-content > #songs-ctr").append('<div>Song URL: <input class="songUrl" type="text" size="35" name="surl" value="'+data.songs[i].url+'"> Name: <input value="'+data.songs[i].name+'" type="text" name="nurl"></div>');
		}
		modal2.style.display = "block";
	}  
		

