package logger

import "github.com/sirupsen/logrus"

// defines keys logrus uses as fields
var (
    FieldKeyMsg     = logrus.FieldKeyMsg
    FieldKeyLevel   = logrus.FieldKeyLevel
    FieldKeyTime    = logrus.FieldKeyTime
    FieldKeyReqid   = "reqid"
    FieldKeyError   = "error"
    FieldKeyPayload = "payload"
    FieldKeyPrefix  = "prefix"
    FieldKeyFile    = "file"
)

func defaultFixedFieldsMap() map[string]struct{} {
    return map[string]struct{}{
        FieldKeyMsg:     {},
        FieldKeyLevel:   {},
        FieldKeyTime:    {},
        FieldKeyReqid:   {},
        FieldKeyError:   {},
        FieldKeyPayload: {},
        FieldKeyPrefix:  {},
        FieldKeyFile:    {},
    }
}

type formatterWrapper struct {
    logrus.Formatter
    FixedFields map[string]struct{}
}

var _ logrus.Formatter = &formatterWrapper{}

func (f *formatterWrapper) Format(entry *logrus.Entry) ([]byte, error) {
    e := logrus.NewEntry(entry.Logger)
    e.Message = entry.Message
    e.Level = entry.Level
    e.Time = entry.Time

    payload := make(map[string]interface{}, len(entry.Data))
    for key, value := range entry.Data {
        if _, ok := f.FixedFields[key]; ok {
            e.Data[key] = value
        } else {
            payload[key] = value
        }
    }

    if len(payload) > 0 {
        e.Data[FieldKeyPayload] = payload
    }

    return f.Formatter.Format(e)
}

// WrapFormatter wraps the original logrus.Formatter to fix the fields of log.
func WrapFormatter(f logrus.Formatter, fixedFields ...string) logrus.Formatter {
    fields := defaultFixedFieldsMap()

    for _, f := range fixedFields {
        fields[f] = struct{}{}
    }

    return &formatterWrapper{
        Formatter:   f,
        FixedFields: fields,
    }
}
