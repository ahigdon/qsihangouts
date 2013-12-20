<%
String HOST = "gae.digihig.com";
//String HOST = "qsihangouts.appspot.com";
%>
<?xml version="1.0" encoding="UTF-8" ?>
<Module>
    <!-- /*
 * Copyright (c) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ -->
  <ModulePrefs title="Starter App">
    <Require feature="rpc"/>
  </ModulePrefs>
  <Content type="html"><![CDATA[
<!DOCTYPE html>
<!-- The hangout API JavaScript. Always include this first -->
<script src="//plus.google.com/hangouts/_/api/v1/hangout.js"></script>
<script src="//<%=HOST%>/static/jquery-1.9.1.js"></script>
<script src="//<%=HOST%>/static/jquery-ui-1.10.3.custom.min.js"></script>

<!-- The JavaScript for this app. This must always be a full URL not a
     relative path.
     Tip: You can load it from a local web server such as
     //<%=HOST%>/app.js for faster single user development -->
<script src="//<%=HOST%>/ggs/app.js"></script>
<script>
jQuery.noConflict();

jQuery(function () {
	jQuery("#tabs").tabs();
});
</script>
<link type="text/css" rel="stylesheet" href="//<%=HOST%>/static/app.css" />
    <div id="container">
        <div id="heading">
             Dragon Phoenix
        </div>
        <div id="usercontrols">
            <button class="controls" id="cmd_clear">Clear</button>
        </div>
        <div id="admincontrols">
            <button class="controls" id="cmd_new">New</button>
            <button class="controls" id="cmd_show">Reveal</button>
        </div>        
        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Yes/No</a></li>
                <li><a href="#tabs-2">Fist to 5</a></li>
                <li><a href="#tabs-3">Points</a></li>
            </ul>
            <div id="tabs-1">
                <button class="yes voting" id="vt_yes">YES</button>&nbsp;&nbsp;
                <button class="no voting" id="vt_no">NO</button>
            </div>
            <div id="tabs-2">
                <button class="voting" id="vt_hand0">
                    <img src="//<%=HOST%>/static/hand0.png" height="35" width="35" />
                </button>&nbsp;&nbsp;
                <button class="voting" id="vt_hand1">
                    <img src="//<%=HOST%>/static/hand1.png" height="35" width="35" />
                </button>&nbsp;&nbsp;
                <button class="voting" id="vt_hand2">
                    <img src="//<%=HOST%>/static/hand2.png" height="35" width="35" />
                </button>
                <br/>
                <br/>
                <button class="voting" id="vt_hand3">
                    <img src="//<%=HOST%>/static/hand3.png" height="35" width="35" />
                </button>&nbsp;&nbsp;
                <button class="voting" id="vt_hand4">
                    <img src="//<%=HOST%>/static/hand4.png" height="35" width="35" />
                </button>&nbsp;&nbsp;
                <button class="voting" id="vt_hand5">
                    <img src="//<%=HOST%>/static/hand5.png" height="35" width="35" />
                </button>
            </div>
            <div id="tabs-3">
                <button class="voting" id="vt_points0">0</button>&nbsp;&nbsp;
                <button class="voting" id="vt_pointsHalf">&frac12;</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points1">1</button>
                <br/>
                <br/>
                <button class="voting" id="vt_points2">2</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points3">3</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points5">5</button>
                <br/>
                <br/>
                <button class="voting" id="vt_points8">8</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points13">13</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points20">20</button>
                <br/>
                <br/>
                <button class="voting" id="vt_points40">40</button>&nbsp;&nbsp;
                <button class="voting" id="vt_points100">100</button>&nbsp;&nbsp;
                <button class="voting" id="vt_pointsQues">?</button>
            </div>
        </div>
        <div style="text-align: right;text-shadow:1px 1px 0px #528ecc">
            <select style="width: 100%" id="participants">
              <option value="none"></option>
            </select>
            Facilitator
        </div>        
    </div>
]]></Content>
</Module>
