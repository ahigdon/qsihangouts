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
}

function updateParticipantsUi(participants) {
	var state = gapi.hangout.data.getState();
	console.log('Participants count: ' + participants.length);
	console.table(state);
	var sel = jQuery("#participants");
	jQuery(participants).each(
			function() {
				sel.append(jQuery("<option>").attr('value', this.id).text(
						this.person.displayName));
				console.log("Participant: " + this.person.displayName);
			});
}

function bindHandlers() {
	jQuery("#participants").change(function() {
		var facilitator = jQuery(this).val();
		gapi.hangout.data.setValue('facilitator', facilitator);
	});
	
    jQuery(".voting").filter(":button").on("click", function() {
		console.log("Voting: " + jQuery( this ).text());
		gapi.hangout.data.submitDelta({
			gapi.hangout.getLocalParticipant().id : jQuery( this ).text()
		});
	});
    
    jQuery(".controls").filter(":button").on("click", function() {
        console.log("Command: " + jQuery( this ).text());
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