package com.episodesolutions.enavpatient;

class AppState {
    static boolean flag = false;
    public static void setState(boolean status){
        flag=status;
    }

    public static boolean getState(){
        return flag;
    }
}
