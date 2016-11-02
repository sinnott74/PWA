var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 *
 * This watch task looks for any gulp tasks ending in ':watch'.
 * This allows each file to define it's own watch task and this
 * will automatically pick it up and run it.
 *
 */
gulp.task('watch', function() {
  // Get all of the gulp task names
  var taskNames = Object.keys(gulp.tasks);
  
  // Store ':watch' tasks in this array
  var gulpWatchTasks = [];

  // Loop over all tasknames
  for (var i = 0; i < taskNames.length; i++) {
    var taskName = taskNames[i];

    // Split tasks on the ':' character
    var taskParts = taskName.split(':');

    // Check length is greater one to avoid selecting this task &
    // check if the last part is 'watch'
    if (taskParts.length > 1 &&
      taskParts[taskParts.length - 1].toLowerCase() === 'watch') {
      // Add task to the watch tasks list
      gulpWatchTasks.push(taskName);
    }
  }

  // Run the gulp watch tasks
  runSequence(gulpWatchTasks);
});
