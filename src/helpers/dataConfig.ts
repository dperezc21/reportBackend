import moment from "moment"


const configFile: any = {
    image_format: 'imeage/jpeg',
    video_format:'video/mp4',
    audio_format: 'audio/mp4',
    number_images: 3,
    number_videos: 1,
    number_audios: 1,
}

const configUser: object = {
    pro_name: "user",
    number_users: 5
}

const configCompany:object = {
    pro_name: "admin",
    work_start_time: 8,
    work_final_time: 18
}

const configReport: object = {
    number_reports: 100,
    max_days_to_display_reports: 90,
    number_files_repots: configFile.number_images + configFile.number_videos + configFile.number_audios
}


export = {
    configUser,
    configCompany,
    configReport,
    configFile
}