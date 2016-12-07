import Moment from 'moment';

export const formatNodeSettings = (cylce_obj) => {
    var obj_to_push = _.cloneDeep(cylce_obj)
    
    for (var i = obj_to_push.plant_stages.length - 1; i >= 0; i--) {
        var new_stage = {}
        new_stage.from_rel = parseInt(obj_to_push.plant_stages[i].from_rel)
        new_stage.to_rel = parseInt(obj_to_push.plant_stages[i].to_rel)
        new_stage.light_on_at = parseInt(obj_to_push.plant_stages[i].light_on_at)
        new_stage.light_off_at = parseInt(obj_to_push.plant_stages[i].light_off_at)
        new_stage.air_temp_high = parseInt(obj_to_push.plant_stages[i].air_temp_high)
        new_stage.air_temp_low = parseInt(obj_to_push.plant_stages[i].air_temp_low)
        obj_to_push.plant_stages[i] = new_stage
    }

    obj_to_push.plant_stages = JSON.stringify(obj_to_push.plant_stages)
    obj_to_push.start_at = obj_to_push.start_at
    obj_to_push.cycle_id = obj_to_push.id
    delete obj_to_push.id
    delete obj_to_push.status
    obj_to_push = {settings: obj_to_push}

    const text_to_push = JSON.stringify(obj_to_push)
    return text_to_push 
}

export const nodeSettingsGetCurrentStage = (node_settings) => {
        for (var i = 0; i < node_settings.plant_stages.length; i++) {
            const stage = node_settings.plant_stages[i]
            
            const from_abs = stage.from_rel + Moment(node_settings.start_at).unix()
            const to_abs = stage.to_rel + Moment(node_settings.start_at).unix()
            
            if (from_abs >= Moment().unix() < to_abs ) {
                return stage
            }
        }
    }