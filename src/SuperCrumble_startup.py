#!/usr/bin/env python3

import iterm2

async def main(connection):
    app = await iterm2.async_get_app(connection)
    window = app.current_terminal_window

    # Set the current directory and run yarn watch in the first tab
    await window.current_tab.current_session.async_send_text('cd ~/Desktop/supercrumble/src/backend\nyarn watch\n')

    # Create a new tab
    tab = await window.async_create_tab()

    # Set the current directory and run yarn dev in the second tab
    await tab.current_session.async_send_text('cd ~/Desktop/supercrumble/src/backend\nyarn dev\n')

    # Create a new tab
    tab = await window.async_create_tab()

    # Run frontend
    await tab.current_session.async_send_text('cd ~/Desktop/supercrumble/src/frontend\nyarn dev\n')

    tab = await window.async_create_tab()

    # Open VSCode
    await tab.current_session.async_send_text('cd ~/Desktop/supercrumble\ncode .\n')

iterm2.run_until_complete(main)