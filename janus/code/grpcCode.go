package code

import gcode "google.golang.org/grpc/codes"

var (
	codeTransform = map[gcode.Code]Code{
		gcode.OK: OK,
		// GCanceled:       ,
		// GUnknown:     ,
		gcode.InvalidArgument: InvalidArgs,
		// GDeadlineExceeded:       ,
		gcode.NotFound:         NotFound,
		gcode.AlreadyExists:    Conflict,
		gcode.PermissionDenied: Unauthorized,
		// GResourceExhausted:     ,
		// GAborted:   ,
		// GOutOfRange:   ,
		// GUnimplemented:,
		gcode.Internal: ResultError,
		// GUnavailable:,
		gcode.DataLoss: DatabaseError,
		// GUnauthenticated:,
	}
)

func CodeTransform(c gcode.Code) Code {
	if m, ok := codeTransform[c]; ok {
		return m
	}
	return Code(c)
}
