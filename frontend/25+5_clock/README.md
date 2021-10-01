# 25 + 5 Clock

This simple app counts down from a given session length, then break length, and it repeats. Upon reaching 0, an alarm can be heard.


The countdown only works if the tab is open. This is because the [Driftless plugin for React](https://github.com/dbkaplun/driftless) uses setTimeout / setInterval, which do not work in the background. I used Driftless because without syncing to date, the basic setTimeout / setInterval are not very punctual.
One could fix this either by rewriting the code to use WebWorkers, or to check the date/time and update accordingly.  

Other than that, it should work fine. :)

See [[Demo]](https://codepen.io/d-o-t/full/oNwJqer).

