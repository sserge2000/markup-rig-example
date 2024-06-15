const through2 = require( 'through2' );
const touch = () => through2.obj( function( file, enc, cb ) {
    if ( file.stat ) {
        file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
    }
    cb( null, file );
});

exports.touch = touch;
