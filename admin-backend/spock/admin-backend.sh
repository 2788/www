#!/bin/bash

./www-admin-api 2>&1 | tee ./run/admin-backend.log
