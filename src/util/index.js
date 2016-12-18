import Moment from 'moment';

export const formatNodeSettings = (cylce_obj) => {
    var obj_to_push = {}
    
    obj_to_push.settings_id = cylce_obj.settings_id
    obj_to_push.aborted = cylce_obj.aborted
    obj_to_push.light_on_at = parseInt(cylce_obj.light_on_at)
    obj_to_push.light_off_at = parseInt(cylce_obj.light_off_at)

    delete obj_to_push.stage_name
    // delete obj_to_push.status
    obj_to_push = {settings: obj_to_push}

    const text_to_push = JSON.stringify(obj_to_push)
    return text_to_push 
}