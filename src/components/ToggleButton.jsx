export default function ToggleButton({ labelText, checkedValue, onChangeFunction }) {
    return (
        <>
            <label className="flex gap-4 items-center cursor-pointer">
                <span className="">
                    {labelText}
                </span>
                <input
                    type="checkbox"
                    id="debug-mode"
                    checked={checkedValue}
                    onChange={onChangeFunction}
                    className="sr-only peer"
                />
                <div className="relative w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-[19px] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </>
    )
}