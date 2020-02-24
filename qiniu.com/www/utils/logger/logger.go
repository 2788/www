package logger

import (
    "io"
    "os"

    "github.com/sirupsen/logrus"
    prefixed "github.com/x-cray/logrus-prefixed-formatter"
)

const (
    loggerTimeFormat = "2006-01-02 15:04:05.00000"
)

// InitLogger Init default logger using specific writer
func InitLogger(writer io.Writer, isJSONFormat, isDebug bool) {
    if writer == nil {
        writer = os.Stdout
    }
    logrus.SetFormatter(getLoggerFormatter(isJSONFormat))
    logrus.SetLevel(getLoggerLevel(isDebug))
    logrus.SetOutput(writer)
    logrus.AddHook(NewCallerHook())
}

func getLoggerFormatter(isJSONFormat bool) logrus.Formatter {
    if isJSONFormat {
        return &logrus.JSONFormatter{
            TimestampFormat: loggerTimeFormat,
        }
    }
    return WrapFormatter(&prefixed.TextFormatter{
        FullTimestamp:    true,
        TimestampFormat:  loggerTimeFormat,
        QuoteEmptyFields: true,
    })
}

func getLoggerLevel(isDebug bool) logrus.Level {
    if isDebug {
        return logrus.DebugLevel
    }
    return logrus.InfoLevel
}

// NewLogger instance a logger using specific writer
func NewLogger(writer io.Writer, isJSONFormat, isDebug bool) logrus.FieldLogger {
    if writer == nil {
        writer = os.Stdout
    }
    log := &logrus.Logger{
        Formatter: getLoggerFormatter(isJSONFormat),
        Level:     getLoggerLevel(isDebug),
        Out:       writer,
        Hooks:     make(logrus.LevelHooks),
    }
    log.AddHook(NewCallerHook())
    return log
}
