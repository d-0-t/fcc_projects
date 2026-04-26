def add_setting(settings,new_setting):
    name, value = new_setting
    name_lower = name.lower()
    value_lower = value.lower()

    if name_lower in settings:
        return f"Setting '{name_lower}' already exists! Cannot add a new setting with this name."
    
    settings[name_lower] = value_lower
    return f"Setting '{name_lower}' added with value '{value_lower}' successfully!"

def update_setting(old,new):
    name, value = new
    name_lower = name.lower()
    value_lower = value.lower()

    if not name_lower in old:
        return f"Setting '{name_lower}' does not exist! Cannot update a non-existing setting."

    old[name_lower] = value_lower
    return f"Setting '{name_lower}' updated to '{value_lower}' successfully!"

def delete_setting(settings,del_key):
    del_key_lower = del_key.lower()
    if not del_key_lower in settings:
        return f"Setting not found!"

    # del settings[del_key_lower]
    settings.pop(del_key_lower, None)
    return f"Setting '{del_key_lower}' deleted successfully!"

def view_settings(settings):
    if not len(settings):
        return "No settings available."

    formatted_settings = "Current User Settings:\n"
    for key,val in settings.items():
        formatted_settings += key.capitalize() + ": " + val + "\n"

    return formatted_settings

test_settings = {'theme': 'light'}

print(update_setting(test_settings, ('volume', 'high')))
print(add_setting(test_settings, ('THEME', 'dark')))
print(add_setting(test_settings, ('volume', 'high')))
print(update_setting(test_settings, ('THEME', 'dark')))
print(view_settings(test_settings))
