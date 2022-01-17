

const configFile: any = {
    image_format: 'imeage/jpeg',
    video_format:'video/mp4',
    audio_format: 'audio/mp4',
    number_images_allowed: 3,
    number_videos_allowed: 1,
    number_audios_allowed: 1,
}

const configUser: object = {
    pro_name: "user"
}

const configCompany:object = {
    pro_name: "admin",
    num_max_users: 5,
    number_max_reports: 100,
    num: configFile.number_audios_allowed + 
         configFile.number_videos_allowed + 
         configFile.number_images_allowed
}

const configReport: object = {
    max_days_to_display_reports: 90
}


export = {
    configUser,
    configCompany,
    configReport,
    configFile
}