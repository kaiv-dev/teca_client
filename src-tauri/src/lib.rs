// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init());
    #[cfg(desktop)]
    {
        builder = builder.setup(|app| {
            global_keys::init_listener(app.handle().clone());
            Ok(())
        });
    }
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(desktop)]
mod global_keys {
    use rdev::{listen, Event, EventType};
    use std::{collections::HashSet, sync::{Arc, Mutex}, thread};
    use tauri::{Manager, Emitter};

    static mut KEYS_TO_WATCH: Option<Arc<Mutex<HashSet<String>>>> = None;

    pub fn init_listener(app: tauri::AppHandle) {
        let keys = Arc::new(Mutex::new(HashSet::new()));
        unsafe { KEYS_TO_WATCH = Some(keys.clone()); }

        thread::spawn(move || {
            if let Err(err) = listen(move |event| {
                if let Some(key_name) = key_name(&event) {
                    // TODO!
                    // let watch_list = keys.lock().unwrap();
                    // if watch_list.contains(&key_name) {
                        for window in app.webview_windows().values() {
                            let _ = window.emit("global-key", &key_name);
                        }
                    // }
                }
            }) {
                eprintln!("Error listening to keyboard: {:?}", err);
            }
        });
    }

    #[tauri::command]
    pub fn register_key(key: String) {
        unsafe {
            if let Some(keys) = &KEYS_TO_WATCH {
                keys.lock().unwrap().insert(key);
            }
        }
    }

    #[tauri::command]
    pub fn unregister_key(key: String) {
        unsafe {
            if let Some(keys) = &KEYS_TO_WATCH {
                keys.lock().unwrap().remove(&key);
            }
        }
    }

    fn key_name(event: &Event) -> Option<String> {
        match event.event_type {
            EventType::ButtonPress(b) => Some(format!("{:?}", b)),
            EventType::KeyPress(m) => Some(format!("{:?}", m)),
            _ => None
        }
    }
}