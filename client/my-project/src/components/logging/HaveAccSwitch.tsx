type HaveAccSwitchProps = {
    haveAcc: boolean;
    toggleHaveAcc: () => void;
};

export default function HaveAccSwitch({haveAcc, toggleHaveAcc}: HaveAccSwitchProps) {
    return (
        <div className="flex flex-row items-center gap-4 justify-between">
          <label className="text-md font-medium text-gray-700">
            {haveAcc ? "Don't have an account?" : "Already have an account?"}
          </label>
          <input
            type="button"
            value={haveAcc ? "Register" : "Login"}
            onClick={ toggleHaveAcc }
            className="text-amber-900 border-2 border-amber-900 rounded-md p-2 px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
          />
        </div>
    );
}