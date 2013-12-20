/*
 * Copyright (c) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
jQuery.noConflict();
var SERVER = 'qsihangouts.appspot.com';
var HOST_URI = '//' + SERVER + '/';

var Votes = {
		  vt_yes: 'vt_yes',
		  vt_no: 'vt_no',
		  vt_hand0: 'vt_hand0',
		  vt_hand1: 'vt_hand1',
		  vt_hand2: 'vt_hand2',
		  vt_hand3: 'vt_hand3',
		  vt_hand4: 'vt_hand4',
		  vt_hand5: 'vt_hand5',
		  vt_points0: 'vt_points0',
		  vt_pointsHalf: 'vt_pointsHalf',
		  vt_points1: 'vt_points1',
		  vt_points2: 'vt_points2',
		  vt_points3: 'vt_points3',
		  vt_points5: 'vt_points5',
		  vt_points8: 'vt_points8',
		  vt_points13: 'vt_points13',
		  vt_points20: 'vt_points20',
		  vt_points40: 'vt_points40',
		  vt_points100: 'vt_points100',
		  vt_pointsQues: 'vt_pointsQues'
		};
var DEFAULT_ICONS = {};
DEFAULT_ICONS[Votes.vt_yes] = HOST_URI + 'static/images/yes.png';
DEFAULT_ICONS[Votes.vt_no] = HOST_URI + 'static/images/no.png';
DEFAULT_ICONS[Votes.vt_hand0] = HOST_URI + 'static/hand0.png';
DEFAULT_ICONS[Votes.vt_hand1] = HOST_URI + 'static/hand1.png';
DEFAULT_ICONS[Votes.vt_hand2] = HOST_URI + 'static/hand2.png';
DEFAULT_ICONS[Votes.vt_hand3] = HOST_URI + 'static/hand3.png';
DEFAULT_ICONS[Votes.vt_hand4] = HOST_URI + 'static/hand4.png';
DEFAULT_ICONS[Votes.vt_hand5] = HOST_URI + 'static/hand5.png';
DEFAULT_ICONS[Votes.vt_points0] = HOST_URI + 'static/images/points0.png';
DEFAULT_ICONS[Votes.vt_pointsHalf] = HOST_URI + 'static/images/pointsHalf.png';
DEFAULT_ICONS[Votes.vt_points1] = HOST_URI + 'static/images/points1.png';
DEFAULT_ICONS[Votes.vt_points2] = HOST_URI + 'static/images/points2.png';
DEFAULT_ICONS[Votes.vt_points3] = HOST_URI + 'static/images/points3.png';
DEFAULT_ICONS[Votes.vt_points5] = HOST_URI + 'static/images/points5.png';
DEFAULT_ICONS[Votes.vt_points8] = HOST_URI + 'static/images/points8.png';
DEFAULT_ICONS[Votes.vt_points13] = HOST_URI + 'static/images/points13.png';
DEFAULT_ICONS[Votes.vt_points20] = HOST_URI + 'static/images/points20.png';
DEFAULT_ICONS[Votes.vt_points40] = HOST_URI + 'static/images/points40.png';
DEFAULT_ICONS[Votes.vt_points100] = HOST_URI + 'static/images/points100.png';
DEFAULT_ICONS[Votes.vt_pointsQues] = HOST_URI + 'static/images/pointsQues.png';

function updateStateUi(state) {
	var stateFacilitator = state['facilitator'];
	console.log("Facilitator: " + stateFacilitator);
	console.table(state);
	if (stateFacilitator == gapi.hangout.getLocalParticipant().id)
		jQuery("#admincontrols").css('visibility', 'visible');
	else
		jQuery("#admincontrols").css('visibility', 'hidden');

	// update participants selectbox to new facilitator

	// update overlay for participant votes
	var keys = gapi.hangout.data.getKeys();
	for(i=0; i<keys.length; i++){
		console.log("STATE:" + keys[i] + " = " + state[keys[i]]);	
		if(keys[i].indexOf("vote") > 0)
			showVote(keys[i], state[keys[i]]);
	}
	
}

var OVERLAYS = {};
var IMGRESOURCES = {};

var imageResource;

function showVote(userKey, vote){
	if(imageResource)
		imageResource.dispose();
	
	if(vote && vote != null){
		imageResource = gapi.hangout.av.effects.createImageResource(DEFAULT_ICONS[vote]);
		var overlay = imageResource.createOverlay({
			'position': {
				'x': 0, 
				'y': 0
			},
			'scale': {
				'magnitude': 0.5,
				'reference': gapi.hangout.av.effects.ScaleReference.WIDTH
			}
		});
		
		overlay.setVisible(true);
	}
}

// TODO need to account for selecting facilitator
function updateParticipantsUi(participants) {
	var state = gapi.hangout.data.getState();
	var stateFacilitator = state['facilitator'];
	console.log('Participants count: ' + participants.length);
	console.table(state);
	var sel = jQuery("#participants");
	sel.empty();
	sel.append(jQuery("<option>").attr('value', "none").text("None"));
	jQuery(participants).each(
			function() {
				sel.append(jQuery("<option>").attr('value', this.id).text(this.person.displayName));
				console.log("Participant: " + this.person.displayName);
				console.log("ParticipantId: " + this.id);
			});
	
	if(stateFacilitator)
		sel.val(stateFacilitator);
}

/**
 * Stores the user's answer in the shared state, or removes it from the shared
 * state if it is the same as the current value.
 * @param {!Answers} newAnswer The user's answer.
 */
function onVote(newVote) {
  // Gets the temporary hangout id, corresponding to Participant.id
  // rather than Participant.id.
  var myId = getUserHangoutId();

  var stateKey = makeUserKey(myId, 'vote');
  var current = gapi.hangout.data.getState(stateKey);

  if (current === newVote) {
    removeValue(stateKey);
  } else {
	  gapi.hangout.data.setValue(stateKey, newVote);
//    saveValue(stateKey, newVote);
  }
}

function onCommand(newCommand) {
	switch(newCommand){
	case "cmd_clear":
		if(imageResource)
			imageResource.dispose();
		break;
	}
}

function removeValue(newVote) {
	gapi.hangout.data.submitDelta(addState, opt_removeState);
}

/**
 * @return {string} The user's ephemeral id.
 */
function getUserHangoutId() {
  return gapi.hangout.getParticipantId();
}

/**
 * Creates a key for use in the shared state.
 * @param {!string} id The user's temporary id.
 * @param {!string} key The property to create a key for.
 * @return {!string} A new key for use in the shared state.
 */
function makeUserKey(id, key) {
  return id + ':' + key;
}

function decodeUserKey(userKey) {
  if (typeof userKey === 'string') {
    var idx = userKey.lastIndexOf(':');

    if (idx >= 0) {
    	return userKey.substr(0, idx);
    }
  }
  return null;
}

function bindHandlers() {
	jQuery("#participants").change(function() {
		var facilitator = jQuery(this).val();
		gapi.hangout.data.setValue('facilitator', facilitator);
	});
	
    jQuery(".voting").filter(":button").on("click", function() {
//    	var vote = jQuery( this ).text();
    	var vote = jQuery( this ).attr('id');
		console.log("Voting: " + vote);
		onVote(vote);
	});
    
    jQuery(".controls").filter(":button").on("click", function() {
        console.log("Command: " + jQuery( this ).text());
        var cmd = jQuery( this ).attr('id');
		console.log("Command: " + cmd);
		onCommand(cmd);
	});
}

// A function to be run at app initialization time which registers our callbacks
function init() {
	console.log('Init app.');

	var apiReady = function(eventObj) {
		if (eventObj.isApiReady) {
			console.log('API is ready');

			gapi.hangout.data.onStateChanged.add(function(eventObj) {
				updateStateUi(eventObj.state);
			});
			gapi.hangout.onParticipantsChanged.add(function(eventObj) {
				updateParticipantsUi(eventObj.participants);
			});

			updateStateUi(gapi.hangout.data.getState());
			updateParticipantsUi(gapi.hangout.getParticipants());

			gapi.hangout.onApiReady.remove(apiReady);

			bindHandlers();
		}
	};

	// This application is pretty simple, but use this special api ready state
	// event if you would like to any more complex app setup.
	gapi.hangout.onApiReady.add(apiReady);
}

gadgets.util.registerOnLoadHandler(init);