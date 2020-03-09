require 'qiniu'
Qiniu.establish_connection! atlab_acc_key: Rails.application.secrets.atlab_acc_key,
                            atlab_sec_key: Rails.application.secrets.atlab_sec_key