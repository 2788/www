package logger

import (
    "io"
    "os"

    "github.com/sirupsen/logrus"
    prefixed "github.com/x-cray/logrus-prefixed-formatter"
    "sync"
    "net/http"
    "qiniu.com/www/env"
)

const (
    loggerTimeFormat = "2006-01-02 15:04:05.00000"
    logKey = "X-log"
)

type ReqLogger interface {
    env.ReqLogger
}

type RpcWrapper struct {
    ReqLogger
    mu     sync.RWMutex
    header http.Header
}

func (r *RpcWrapper) Xput(logs []string) {
    r.mu.Lock()
    defer r.mu.Unlock()

    if r.header == nil {
        r.header = make(http.Header)
    }
    r.header[logKey] = append(r.header[logKey], logs...)
}

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



func NewRpcWrapper(logger ReqLogger) *RpcWrapper {
    wrapper := new(RpcWrapper)
    wrapper.ReqLogger = logger
    return wrapper
}
