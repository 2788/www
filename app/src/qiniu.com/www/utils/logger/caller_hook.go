package logger

import (
    "fmt"
    "path/filepath"
    "runtime"
    "strconv"
    "strings"

    "github.com/sirupsen/logrus"
)

// CallerHook hook to print file and line of caller
type CallerHook struct {
    prefixSize int
    basePath   string
}

// NewCallerHook initilize a caller hook instance
func NewCallerHook() *CallerHook {
    hook := CallerHook{}
    hook.basePath, hook.prefixSize = getPrefixSize()
    return &hook
}

func getPrefixSize() (basePath string, prefixSize int) {
    _, file, _, ok := runtime.Caller(0)
    if file == "?" {
        return
    }

    if ok {
        size := len(file)
        suffix := len("qiniu.com/www/utils/logger/caller_hook.go")
        basePath = file[:size-suffix]
        prefixSize = len(basePath)
    }

    return
}

func (hook *CallerHook) trimBasePath(filename string) string {
    if hook.basePath != "" && strings.HasPrefix(filename, hook.basePath) {
        return filename[hook.prefixSize:]
    }
    return filename
}

// Levels specifies levels should be applied to
func (hook *CallerHook) Levels() []logrus.Level {
    return []logrus.Level{
        logrus.PanicLevel,
        logrus.FatalLevel,
        logrus.ErrorLevel,
        logrus.WarnLevel,
        logrus.InfoLevel,
        logrus.DebugLevel,
    }
}

// Fire implements interface to perform actions when current hook fires
func (hook *CallerHook) Fire(entry *logrus.Entry) error {
    file, line := getCallerIgnoringLogMulti(1)
    file = hook.trimBasePath(file)

    entry.Data[FieldKeyFile] = fmt.Sprintf("%s:%d", file, line)
    return nil
}

func (hook *CallerHook) caller(skip int) string {
    if _, file, line, ok := runtime.Caller(skip); ok {
        return strings.Join([]string{filepath.Base(file), strconv.Itoa(line)}, ":")
    }
    // not sure what the convention should be here
    return "???"
}

func getCaller(callDepth int, suffixesToIgnore ...string) (file string, line int) {
    // bump by 1 to ignore the getCaller (this) stackframe
    callDepth++

outer:
    for {
        var ok bool

        _, file, line, ok = runtime.Caller(callDepth)
        if !ok {
            file = "???"
            line = 0
            break
        }

        for _, s := range suffixesToIgnore {
            if strings.HasSuffix(file, s) {
                callDepth++
                continue outer
            }
        }
        break
    }

    return
}

func getCallerIgnoringLogMulti(callDepth int) (string, int) {
    // the +1 is to ignore this (getCallerIgnoringLogMulti) frame
    return getCaller(callDepth+1, "logrus/hooks.go", "logrus/entry.go", "logrus/logger.go", "logrus/exported.go", "asm_amd64.s")
}
